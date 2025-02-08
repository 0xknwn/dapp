// import { data } from "@0xknwn/connect-core";

const update = (value: number) => {
  const show = document.getElementById("show");
  if (show) {
    show.innerHTML = `<div>${value}</div>`;
  }
};

export default update;
