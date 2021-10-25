import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandRock,
  faHandScissors,
  faHandPaper,
} from "@fortawesome/free-solid-svg-icons";

function loop(length) {
  let rows = [];

  for (let index = 1; index <= length; index++) {
    if ((index + 2) % 3 == 0)
      rows.push(
        <li>
          <FontAwesomeIcon icon={faHandPaper} />
        </li>
      );
    if ((index + 1) % 3 == 0)
      rows.push(
        <li>
          <FontAwesomeIcon icon={faHandScissors} />
        </li>
      );
    if ((index + 0) % 3 == 0)
      rows.push(
        <li>
          <FontAwesomeIcon icon={faHandRock} />
        </li>
      );
  }

  return rows;
}

const HandIcon = () => {
  return (
    <div className="marquee">
      <ul className="marquee-content">
        {loop(9)}
        {loop(5)}
      </ul>
    </div>
  );
};

export default HandIcon;
