import main from './main.js';
import InOutroCanvas from './in-outro/inOutroCanvas.js';


window.onload = function () {
  const intro = new InOutroCanvas();
  intro.mode("intro");
  intro.run();
  intro.isDone = function() {
    main();
  }

}