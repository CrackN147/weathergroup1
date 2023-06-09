export const SearchList = (props) => {
  const {
    searchResults,
    changeCity
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
          let list = item.split('	');
          return (
            <li
              key={index}
              className="list-group-item pointer custom-element-hover"
              onClick={
                () => changeCity(list[0])
              }
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}