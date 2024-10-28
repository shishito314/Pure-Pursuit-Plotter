const app = document.getElementById("app");

function createTitle(title) {
  if (title) return title;
  else return "default title";
}

function Header({ title }) {
  // console.log(title);
  return <h1>{createTitle(title)}</h1>;
}

function HomePage() {
  const data = ["first", "second", "third", "fourth", "fifth"];

  const [numClicks, setClicks] = React.useState(0);

  function handleClick() {
    // console.log("handling Click");
    setClicks(numClicks + 1);
  }

  return (
    <div>
      <Header title="Test Title" />
      <Header title="Other Title" />
      <ul>
        {data.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={handleClick}>click me! ({numClicks})</button>
    </div>
  );
}

const root = ReactDOM.createRoot(app);
root.render(<HomePage />);

// const header = document.createElement("h1");
// const text = "test text";
// const headerContent = document.createTextNode(text);
// header.appendChild(headerContent);
// app.appendChild(header);
