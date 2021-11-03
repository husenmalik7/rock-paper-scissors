import "../styles/pagination.css";

export const Pagin = (props) => {
  return (
    <>
      <div className="pagination">
        <ul>
          {props.paginationObject.page > 1 ? (
            <a href={`/highscores?page=${props.paginationObject.page - 1}`}>
              <li className="btn prev">
                <span>
                  <i className="fas fa-angle-left"></i> Prev
                </span>
              </li>
            </a>
          ) : null}

          {props.paginationState.map((p, index) => {
            return (
              <a
                href={`highscores?page=${p}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <li
                  className={
                    p === props.paginationObject.page ? `numb active` : `numb`
                  }
                >
                  <span>{p}</span>
                </li>
              </a>
            );
          })}

          {props.paginationObject.page <
          props.paginationObject.numberOfPages ? (
            <a href={`/highscores?page=${props.paginationObject.page + 1}`}>
              <li className="btn next">
                <span>
                  Next <i className="fas fa-angle-right"></i>
                </span>
              </li>
            </a>
          ) : null}
        </ul>
      </div>
    </>
  );
};
