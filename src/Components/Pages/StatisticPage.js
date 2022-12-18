import { Chart } from 'chart.js/auto';
import { clearPage } from '../../utils/render';
import { getAuthenticatedUser } from '../../utils/auths';
import Navigate from '../Router/Navigate';
import { clearActive, setActiveLink } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';

const text = `
<div class="text-center">
  <h2 class="display-2">Your insights</h2>
</div>
<div style="display:block;margin:0 auto; width:20%">
  <div>
    <canvas id="myChart" height="250" width="400"></canvas>
  </div>
</div>
<div style="display:block;margin:0 auto; width:20%">
  <div>
    <canvas id="myChart2" height="250" width="400"></canvas>
  </div>
</div>
`;

/* const getData = {
  nbrOfProdcuts,
};

const options = {
  method: 'GET',
  body: JSON.stringify(getData),
  headers: {
    'Content-Type': 'application/json',
  },
};

const response = await fetch('/api/products/countAll', options);

if (!response.ok) {
  throw new Error(
    // eslint-disable-next-line no-irregular-whitespace
    `fetch error : ${response.status}:${response.statusText}`,
  );
} */

const StatisticPage = () => {
  clearPage();
  setActiveLink('statisticPage');
  setUserIcon('extUserPage');
  Navbar();
  // verifie si l'user s'est login pour acceder à cette page
  const user = getAuthenticatedUser();
  if (user === undefined) {
    clearActive();
    Navigate('/login');
  } else {
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = text;

    (async () => {
      const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
        { year: 2017, count: 45 },
      ];

      // eslint-disable-next-line no-new
      new Chart(document.getElementById('myChart'), {
        type: 'polarArea',
        data: {
          labels: data.map((row) => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map((row) => row.count),
            },
          ],
        },
        options: {
          responsive: true,
        },
      });

      // eslint-disable-next-line no-new
      new Chart(document.getElementById('myChart2'), {
        type: 'bar',
        data: {
          labels: data.map((row) => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map((row) => row.count),
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Monthly overview of sales :',
            },
          },
          responsive: true,
        },
      });
    })();
  }
  /* https://www.chartjs.org/docs/latest/getting-started/ */
};

export default StatisticPage;
