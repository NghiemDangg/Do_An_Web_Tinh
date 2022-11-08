// table row

const table_row = $(".table-row");

table_row.click(function () {
  $(this).toggleClass("table-row-focus");
});

const flight_data_row = $(".flight-data-row");
const  flight_data = $(".flight-data");
const grid_data = $(".grid-data");

flight_data_row.click(function () {
  grid_data.addClass('d-none');
  flight_data.removeClass('d-none');
});
