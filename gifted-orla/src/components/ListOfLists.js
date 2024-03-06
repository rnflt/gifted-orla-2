import ListCard from "./ListCard";

const ListOfLists = ({ lists }) => (
  lists.map(({ id, name }) => (
    <ListCard id={id} name={name} />
  ))
);

export default ListOfLists;