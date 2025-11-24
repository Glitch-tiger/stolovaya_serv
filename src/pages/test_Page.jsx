

function Test_Page() {
  const handleClick = () => {
    alert('Кнопка 1');
  };

  return (
    <div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleClick}
      >
        Я кнопка 1
      </button>
    </div>
  );
}

export default Test_Page;