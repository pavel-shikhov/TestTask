import { Selector, ClientFunction } from 'testcafe';

fixture `TestTask`
    .page `https://theboats.com/`;

const getUrl = ClientFunction(() => document.location.href);

const getUrlParameter = ClientFunction((getParamonth) => {
  const u = new URLSearchParams(document.location.search);
  return u.get(getParamonth);
});

test('date range selection test', async t => {
  const calendarButton = Selector('.calendar-input-icon');
  await t
    .click(calendarButton);

  const months = Selector('div').withAttribute('class', /jsx-[0-9]+ month-button/);
  let month = null;
  let counter = 0;
  while (month == null) {
    if (await months.nth(counter).hasClass("isLocked")) {
      counter++;
    } else {
      month = await months.nth(counter);
    }
  }

  await t
    .click(month)
    .expect(getUrl()).contains('dateFrom')
    .expect(getUrl()).contains('dateTo');

  let dateFromonth = await getUrlParameter("dateFrom");
  let dateTo = await getUrlParameter("dateTo");

  await t
  .click(Selector('button').withExactText("Search"))
  .expect(await getUrlParameter("dateFrom")).eql(dateFromonth)
  .expect(await getUrlParameter("dateTo")).eql(dateTo);

});
