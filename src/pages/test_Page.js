
function Test_Page() {

    const handleClick = () => {
    alert('Кнопка нажата!');
  };


  return (
<div>
  <h1>Я страница 1</h1>
  <button
    type="button"
    className="btn btn-primary"
    onClick={handleClick}>
    Я кнопка
  </button>
</div>
  );
}

export default Test_Page;
