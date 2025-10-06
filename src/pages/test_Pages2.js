
function Test_Page2() {

    const handleClick = () => {
    alert('Кнопка нажата!');
  };


  return (
<div>
  <h1>Я страница 2</h1>
  <button
    type="button"
    className="btn btn-primary"
    onClick={handleClick}>
    Я кнопка
  </button>
</div>
  );
}

export default Test_Page2;
