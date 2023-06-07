import PropTypes from 'prop-types';

const SearchBox = (props) => {
  const {
    search,
    changeSearch
  } = props;
  return (
    <div className="col-12 d-flex justify-content-center align-items-center"
      style={{
        height: '100px',
      }}
    >
      <input
        className="rounded-pill border border-primary-subtle p-3"
        style={{
          width: '50%',
        }}
        type="text"
        placeholder="Search..."
        value={search}
        onChange={changeSearch}
      />
    </div>
  );
}
SearchBox.propTypes = {
  search: PropTypes.string.isRequired,
  changeSearch: PropTypes.func.isRequired,
}
export {SearchBox};