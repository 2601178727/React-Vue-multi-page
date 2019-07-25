import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { handleNaviBar } from '@/utils/tools'
import { VC } from '@/mixins/init'
import {
  Tabs,
  Badge
} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import CardItem from './CardItem'

const HomeWrapper = styled.div `
  margin: 0 auto;
`;


class Counter extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    token: {}
  }
  getToken = (token) => {
    this.setState({
      token
    })
  }
  componentWillMount() {
    handleNaviBar({
      title: '报销申请的记录'
    })
  }
  componentDidMount() {
    console.log('componentDidmount')
    const app = {}
    app.getToken = this.getToken.bind(this)
    window.app = app
  }

  render() {
    const tabs = [
      { title: <Badge text={'3'}>我发起的</Badge> },
      { title: <Badge text={'20'}>我处理的</Badge> },
      { title: <Badge dot>抄送我的</Badge> },
    ];
    const style = {
      // width: '28%',
      backgroundColor: '#4070DD'
    };
    return (
      <HomeWrapper>
         <Helmet>
          <title>申请单记录</title>
        </Helmet>
        <Tabs tabs={tabs}
          initialPage={0}
          distanceToChangeTab={.2}
          tabBarUnderlineStyle={style}
          tabBarActiveTextColor={'#4070DD'}
          tabBarInactiveTextColor={'#bbbbbb'}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <CardItem />
          <CardItem data='1'/>
          <CardItem data='2'/>
        </Tabs>
      </HomeWrapper>
    )
  }
}

Counter.propTypes = {
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
  }
}

const App =  connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default App
