import "./styles.css";

export const FallbackUI = () => {
  return (
    <section className="wrapper-game">
      <div className="game-table">
        {(
          "1t3S56" +
          "1ooops" +
          "123m56" +
          "12went" +
          "123t5r" +
          "123h5y" +
          "123i56" +
          "wrong." +
          "1e3g56" +
          "1f3456" +
          "1r3456" +
          "1e3456" +
          "1s3456" +
          "1h3456" +
          "1.3456"
        )
          .split("")
          .map((letter, i) => {
            return (
              <div
                className="square"
                key={i}
                style={
                  isNaN(letter)
                    ? null
                    : i === 59 || i === 70
                    ? null
                    : { visibility: "hidden" }
                }
              >
                <div className="square__top"></div>
                <div className="square__bottom"></div>
                <div className="square__right"></div>
                <div className="square__left"></div>
                <div className="square__back"></div>
                <div className="square__front">
                  <strong
                    className={`letter${
                      i === 59 || i === 70 ? " fix-position" : ""
                    }`}
                  >
                    {i === 59 ? "🐍" : i === 70 ? "🐞" : letter}
                  </strong>
                  <sub className="number">
                    {i === 59 || i === 70
                      ? null
                      : Math.floor(Math.random() * 10)}
                  </sub>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};
