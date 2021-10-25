import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandRock,
  faHandScissors,
  faHandPaper,
} from "@fortawesome/free-solid-svg-icons";

function loop(length) {
  let rows = [];

  for (let index = 1; index <= length; index++) {
    if ((index + 2) % 3 === 0)
      rows.push(
        <li>
          <FontAwesomeIcon icon={faHandPaper} />
        </li>
      );
    if ((index + 1) % 3 === 0)
      rows.push(
        <li>
          <FontAwesomeIcon icon={faHandScissors} />
        </li>
      );
    if ((index + 0) % 3 === 0)
      rows.push(
        <li>
          <FontAwesomeIcon icon={faHandRock} />
        </li>
      );
  }

  return rows;
}

const HandIcon = (props) => {
  let arrLength = props.arrLength;
  if (props.arrLength === undefined) arrLength = [1, 1];

  return (
    <div className="marquee">
      <ul className="marquee-content">
        {loop(arrLength[0])}
        {loop(arrLength[1])}
      </ul>
    </div>
  );
};

export default HandIcon;
