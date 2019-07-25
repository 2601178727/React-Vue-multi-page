import React, { Component } from "react";
import styled from "styled-components";
import { buildStyle } from "@/utils/tools";
import PropTypes from "prop-types";

const HomeWrapper = styled.div`
  width: 100%;
`;
const Input = styled.input.attrs(props => ({
  placeholder: props.placeholder,
  value: props.value
}))`
  width: 100%;
  height: ${buildStyle(30)};
  box-sizing: border-box;
  border: ${buildStyle(1)} solid rgba(187, 187, 187, 1);
  border-radius: ${buildStyle(4)};
  padding: ${buildStyle(8)} ${buildStyle(9)};
  color: #4c88ff;
  &::placeholder {
    color: #ddd;
  }
`;

export default class InputComponent extends Component {
  constructor() {
    super();
    
    this.state = {
      placeholder: '',
      value: '',
      onChange: () => {}
    };
  }
  componentDidMount() {
    const { onChange } = this.props
    const placeholder =
      "placeholder" in this.props
        ? this.props.placeholder
        : this.defaultProps.placeholder;
    const value =
      "value" in this.props
        ? this.props.value
        : this.defaultProps.value;
    this.setState({
      onChange,
      placeholder,
      value
    })
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }
  onChange = (e) => {
    const {onChange} = this.state
    const value = e.target.value
    this.setState({
      value
    })
    onChange(value)
  }
  
  render() {
    const { placeholder } = this.state;
    return (
      <HomeWrapper>
        <Input onChange={this.onChange} placeholder={placeholder} />
      </HomeWrapper>
    );
  }
}

InputComponent.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
InputComponent.defaultProps = {
  placeholder: "请输入",
  value: ''
};
