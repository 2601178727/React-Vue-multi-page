/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import { PullToRefresh, ListView } from 'antd-mobile';
import styled from 'styled-components';
import { buildStyle } from '@/utils/tools';

const HomeWrapper = styled.div `
  width: 100%;
  height: auto;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${buildStyle(8)};
  box-sizing: border-box;
  /* &::before{
    content: '';
    display: inline-block;
    background-color: #F5F5F9;
    height: ${buildStyle(8)};
    border-top: 1px solid #ECECED;
    border-bottom: 1px solid #ECECED;
  } */
`;
const Separator = styled.div`
  background-color: #F5F5F9;
  height: ${buildStyle(8)};
  border-top: 1px solid #ECECED;
  border-bottom: 1px solid #ECECED;
`;
const ItemType = styled.img.attrs(props => ({
  src: props.src
})) `
  width: ${buildStyle(48)};
  height: ${buildStyle(48)};
`;
const ItemBody = styled.div`
  width: 65%;
  height: auto;
  margin-left: ${buildStyle(8)};
`;
const BodyTitle = styled.p`
  font-size: ${buildStyle(16)};
  color: #333;
`;
const BodySubtitle = styled.p`
  font-size: ${buildStyle(13)};
  color: #999;
`;
const BodyTime = styled.p`
  font-size: ${buildStyle(12)};
  color: #bbb;
`;

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}


export default class Demo extends React.Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      data: [
        {
          img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
          title: 'Meet hotel',
          des: '不是所有的兼职汪都需要风吹日晒',
        },
        {
          img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
          title: 'McDonald\'s invites you',
          des: '不是所有的兼职汪都需要风吹日晒',
        },
        {
          img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
          title: 'Eat the week',
          des: '不是所有的兼职汪都需要风吹日晒',
        },
        {
          img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
          title: 'Eat the week',
          des: '不是所有的兼职汪都需要风吹日晒',
        },
        {
          img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
          title: 'Eat the week',
          des: '不是所有的兼职汪都需要风吹日晒',
        }
      ],
      
      pageIndex: 0, // 当前页面
      dataSource,
      refreshing: true, // loading
      isLoading: true, // loading
      height: document.documentElement.clientHeight * 3 / 4 // 页面高度
    };
  }
  genData = (pIndex = 0) => {
    const { data } = this.state
    return new Promise(function(resolve, reject) {
      resolve(data)
    })
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    this.genData().then(res => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res),
        isLoading: false,
        height: hei,
      });
    }).catch(err => {
      console.log(err)
    });
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
  //     });
  //   }
  // }
  onRefresh = () => {
    const { data } = this.state
    this.setState({ refreshing: true, isLoading: true });
    this.genData().then(res => {
      console.log(this)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res.concat(data)),
        refreshing: false,
        isLoading: false,
      });
    }).catch(err => {
      console.log(err)
    });
  }
  onEndReached = (event) => {
    const { pageIndex, data, dataSource } = this.state;
    console.log('onEndReached', pageIndex, typeof pageIndex);
    console.log('dataSource', dataSource, typeof dataSource);
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    // todo
    this.genData(pageIndex + 1).then(res => {
      this.setState({
        isLoading: true,
        pageIndex: pageIndex + 1,
        dataSource: dataSource.cloneWithRows(res.concat(data)),
        isLoading: false,
      });
    }).catch(err => {
      console.log(err)
    });
  }
  render() {
    const { data } = this.state
    // todo

    let index = data.length - 1;
    // todo
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        return (<span></span>)
        // index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div>
          <Separator />
          <HomeWrapper key={rowID}>
            <ItemType src='https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png'/>
            <ItemBody>
              <BodyTitle>补卡审批</BodyTitle>
              <BodySubtitle>申请人：郑思武</BodySubtitle>
              <BodySubtitle>审批编号：JSYGA201811280001</BodySubtitle>
              <BodyTime>申请时间：2018-11-16  18:50</BodyTime>
            </ItemBody>
          </HomeWrapper>
        </div>
      );
    };

    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource} // 实例
        initialListSize={10} // 首屏展示行数
        /* renderHeader={() => <span>header</span>} // 页头
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)} // 页脚
        renderSectionHeader={sectionData => ( // 为每次加载渲染一个标题
          <div>{`Task ${sectionData.split(' ')[1]}`}</div>
        )}
        renderBodyComponent={() => <MyBody />} // 自定义 body 的包裹组件
        */
        renderRow={row} // 每行组件
        // renderSeparator={separator} // 渲染在每行最下面，可用来做卡片间距
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        pageSize={10} // 每次事件循环（每帧）渲染的行数
        onScroll={() => { console.log('scroll'); }} // 滚动事件
        scrollRenderAheadDistance={500} // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
        onEndReached={this.onEndReached} // 加载新数据
        onEndReachedThreshold={10} // 触发onEndReached的值
      />
    );
  }
}
