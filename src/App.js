import React, { Component } from 'react';
import axios from 'axios';
import { Form, Container, Button, Input, Grid, Divider } from 'semantic-ui-react'
import ResultCard from './ResultCard'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchHistory: [],
      query: '',
      list: [],
      loading: false
    }
  }

  updateQuery(e) {
    this.setState({query: e.target.value});
  }

  async query() {
    const config = {
      params: {
        query: this.state.query
      }
    };

    this.saveSearchHistory(this.state.query);

    this.setState({loading: true});

    const response = await axios.get('https://www.headlightlabs.com/api/assessment_search_wrapper', config);

    const list = response && response.data && response.data.itemListElement || [];
    this.setState({list, loading: false});
  }

  componentDidMount(){
    this.setState({searchHistory: this.getSearchHistory()});
  }

  searchByHistory(query){
    this.setState({query}, () => {
      this.query(query);
    });
  }

  getSearchHistory(){
    return this.getArrayFromLocalStorage('searchHistory', []);
  }

  getArrayFromLocalStorage (name, fallback) {
    try {
      const item = localStorage.getItem('searchHistory');
      return item.split(',');
    } catch (e) {
      return fallback;
    }
  }

  saveSearchHistory(query){

    let searchHistory = this.state.searchHistory.concat([]);

    const index = searchHistory.indexOf(query);

    if (index !== -1) {
      searchHistory.splice(index, 1);
    }

    searchHistory.unshift(query);

    this.setState({searchHistory});
    localStorage.setItem('searchHistory', searchHistory);
  }

  render() {
    return (
      <Container>

        <Form style={{marginTop: '16px'}}>
          <Input onChange={this.updateQuery.bind(this)} value={this.state.query} loading={this.state.loading} placeholder='Search...' style={{marginRight: '16px'}} />
          <Button submit primary onClick={this.query.bind(this)}>Search</Button>
        </Form>

        <div style={{marginTop: '16px'}}>
          { this.state.searchHistory.map((item, index) =>
            <Button key={index} size='mini' onClick={this.searchByHistory.bind(this, item)}>{item}</Button>
          )}
        </div>


        <Divider />

        <Grid>
          <Grid.Row>
        { this.state.list.map((item, index) =>
            <Grid.Column key={index} width={4}>
              <ResultCard
                name={item.result.name}
                type={item.result.description}
                description={item.result.detailedDescription && item.result.detailedDescription.articleBody}
                imageUrl={item.result.image && item.result.image.contentUrl}
              >
              </ResultCard>
            </Grid.Column>
        )}
          </Grid.Row>
        </Grid>

      </Container>
    );
  }
}

export default App;
