import { Link, useOutletContext } from "react-router-dom";

function PostList() {
  const { posts } = useOutletContext();

  const { data, isLoading } = posts;

  if (isLoading) return;
  // console.log(data);

  return (
    <div>
      <ul>
        아이템 목록
        {data.map((item) => (
          <li key={item.id}>
            <Link to={"/post/" + item.id}>
              {item.text}:{item.false}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
