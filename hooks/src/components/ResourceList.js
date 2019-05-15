import React from 'react';
import useResources from './useResources';

// COMPONENT

const ResourceList = ({ resource }) => {
  const resources = useResources(resource);

  return (
    <ul>
      {resources.map(record => (
        <li key={record.id}>
          {record.id}: {record.title}
        </li>
      ))}
    </ul>
  );
};

export default ResourceList;

//Older code Refactored with reusable code above

// const ResourceList = ({ resource }) => {
//   const [resources, setResources] = useState([]);

//   //calling useEffect with the array as second argument
//   //if we call useEffect WITHOUT SECOND ARGUMENT, the inner/arrow function will be called 100% every time!!!
//   //if we call useEffect WITH EMPTY ARRAY as second argument,its our signal that we are passing a function that we want to be invoked only ONE TIME/essentialy identical to comonentDidMount!!!
//   useEffect(() => {
//     //we moved fetchResource inside useEffect to avoid warning message in console
//     //also can define anonymous arrow function and invoke immediately
//     (async resource => {
//       const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/${resource}`
//       );

//       setResources(response.data);
//     })(resource);

//     // const fetchResource = async () => {
//     //   const response = await axios.get(
//     //     `https://jsonplaceholder.typicode.com/${resource}`
//     //   );

//     //   setResources(response.data);
//     // };
//     // fetchResource(resource);
//     // ! ! ! ! ! !
//   }, [resource]);

//   return (
//     <ul>
//       {resources.map(record => (
//         <li key={record.id}>
//           {record.id}: {record.title}
//         </li>
//       ))}
//     </ul>
//   );
// };

// Refactoring class comp to arrow funct
// export default class ResourceList extends Component {
//   state = { resources: [] };

//   async componentDidMount() {
//     const response = await axios.get(
//       `https://jsonplaceholder.typicode.com/${this.props.resource}`
//     );

//     this.setState({ resources: response.data });
//   }

//   async componentDidUpdate(prevProps) {
//     if (prevProps.resource !== this.props.resource) {
//       const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/${this.props.resource}`
//       );
//       this.setState({ resources: response.data });
//     }
//   }

//   render() {
//     return <div>{this.state.resources.length}</div>;
//   }
// }
