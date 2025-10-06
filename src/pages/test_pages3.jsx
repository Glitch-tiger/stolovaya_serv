

function Test_Page3() {
  const handleClick = () => {
    alert('Кнопка 3');
  };

  return (
    <div>
      <h1>Я страница 3</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleClick}
      >
        Я кнопка 3
      </button>
      <button type="button" class="btn btn-outline-primary">Primary</button>
    <div class="mb-3">
  <label for="formGroupExampleInput" class="form-label">Пример метки</label>
  <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Пример подсказки поля ввода"></input>
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label">Другая метка</label>
  <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Другая подсказка поля ввода"></input>
</div>
    </div>
  );
}

export default Test_Page3;