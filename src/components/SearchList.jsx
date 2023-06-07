export const SearchList = (props) => {
  const {
    searchResults
  } = props;
  return (
    <div className="position-absolute top-100 start-50 translate-middle-x overflow-scroll"
      style={{
        width: '50%',
        height: '500px',
        zIndex: 1,
      }}
    >
      <ul className="list-group">
        {searchResults.map((item, index) => {
          return (
            <li
              key={index}
              className="list-group-item"
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}