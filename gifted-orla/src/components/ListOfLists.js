import React, { Component } from "react";
import ListCard from "./ListCard";

class ListOfLists extends Component {
  render() {
    const list = this.props.list;
    return list.map((list) => <ListCard key={list.id} name={list.name} />);
  }
}
export default ListOfLists;
