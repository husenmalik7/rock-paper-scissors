import { Pagination } from "react-bootstrap";

export const Pagin = (props) => {
  return (
    <>
      <Pagination>
        {props.paginationObject.page > 1 ? (
          <Pagination.Prev
            style={{ color: "red", backgroundColor: "red" }}
            href={`/highscores?page=${props.paginationObject.page - 1}`}
          />
        ) : null}

        {props.paginationState.map((p, index) => {
          return (
            <Pagination.Item
              key={index}
              href={`highscores?page=${p}`}
              active={p === props.paginationObject.page}
            >
              {p}
            </Pagination.Item>
          );
        })}

        {props.paginationObject.page < props.paginationObject.numberOfPages ? (
          <Pagination.Next
            href={`/highscores?page=${props.paginationObject.page + 1}`}
          />
        ) : null}
      </Pagination>
    </>
  );
};
