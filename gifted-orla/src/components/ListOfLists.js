import React, { Component } from "react";
import ListCard from "./ListCard";

class ListOfLists extends Component {
  render() {
    const lists = this.props.lists;
    return lists.map((list) => (
      <ListCard key={list.id} id={list.id} name={list.name} />
    ));
  }
}
export default ListOfLists;
