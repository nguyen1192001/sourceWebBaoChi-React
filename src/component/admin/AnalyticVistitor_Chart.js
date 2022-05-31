import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { getListAccount, getListAnalytics } from '../../Redux/action/admin'
import { Api } from '../Api'
import { useDispatch, useSelector } from 'react-redux'
import { getListComment, getListNew } from '../../Redux/action/articles'

function AnalyticVistitor_Chart() {
  const dispatch = useDispatch()
  let dataPayload
  let analytics = []

  const fetchListAnalytics = async () => {
    let response = await axios.get(Api().analytics);
    let datafromAPI = response.data

    console.log(">>>>>>>.datafromAPI", datafromAPI)
    datafromAPI.forEach(element => {
      const date = element.dateAnalyst
      const quantity = element.quantity
      analytics.push({ date, quantity })
    });

    console.log(">>>>>>>>>analytics",analytics)
    dispatch(getListAnalytics(analytics));
  };


  // analytics 1

  const analytic = useSelector((state) => state.admin.analytics)
  const arrDate = []
  analytic.forEach(item => arrDate.push(item.date))
  const arrQuantity = []
  analytic.forEach(item => arrQuantity.push(item.quantity))

  dataPayload = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: arrDate
      }
    },
    series: [
      {
        name: "series-1",
        data: arrQuantity
      }
    ]
  }

  const fetchListComement = async () => {
    const response = await axios.get(Api().allcommnet);
    dispatch(
      getListComment(response.data)
    );
  };

  // get cmt and id_article

  let listComment = useSelector((state) => state.user.commnets);
  let result = []
  let count = 1

  console.log("list comment ", listComment)

  for (let j = 0; j < listComment.length;) {
    for (let i = j + 1; i < listComment.length; i++) {
      if (listComment[j].articleId == listComment[i].articleId) {
        count = count + 1
      }
    }
    let article_ID = listComment[0].articleId
    result.push({ article_ID, count })
    listComment = listComment.filter((item) => {
      return item.articleId !== listComment[0].articleId
    })
    count = 1
    j = 0
  }
  // get 3 item after sort
  result.push({ article_ID: "fldjsfjdlsa", count: 19 })
  const test = result.sort((a, b) => a.count - b.count)
  console.log(">>>>>>>.. result", test)

  // analyics 2

  let idArticles = []
  result.forEach(item => idArticles.push(item.article_ID))
  let countDtPl2 = []
  result.forEach(item => countDtPl2.push(item.count))
  let dataPayload2

  dataPayload2 = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: idArticles
      }
    },
    series: [
      {
        name: "series-1",
        data: countDtPl2
      }
    ]
  }

  // dataPayLoad3

  const fetchListNew = async () => {
    const response = await axios.get(Api().articlesfromtexted);
    console.log("home response data", response.data)
    dispatch(getListNew(response.data));
  };


  let news = useSelector((state) => state.user.articles)
  console.log(">>>>.new length", news)
  let resultAnalytic2 = []
  let countAnalytic2 = 1

  for (let j = 0; j < news.length;) {
    for (let i = j + 1; i < news.length; i++) {
      if (news[j].userId == news[i].userId) {
        countAnalytic2 = countAnalytic2 + 1
      }
    }
    let userId = news[0].userId
    resultAnalytic2.push({ userId, countAnalytic2 })
    news = news.filter((item) => {
      return item.userId !== news[0].userId
    })
    countAnalytic2 = 1
    j = 0
  }
  // resultAnalytic2.push({ userId: '624c0d9aabfe61ea9894e2a5', countAnalytic2: 9 }, { userId: '624c0d9aabfe61ea9894e2a6', countAnalytic2: 1 })

  // console.log(">>>>>>>.. result analytics 2", resultAnalytic2)
  // get 3 item after sort
  let test2 = resultAnalytic2.sort((a, b) => a.countAnalytic2 - b.countAnalytic2)
  console.log(">>>>>>>.. result", test2)
  let idArticles3 = []
  resultAnalytic2.forEach(item => idArticles3.push(item.userId))
  console.log(">>>>>>>.. result analytics 2", idArticles3)
  let countDtPl3 = []
  resultAnalytic2.forEach(item => countDtPl3.push(item.countAnalytic2))
  console.log(">>>>>>>.. result analytics 2", countDtPl3)
  let dataPayLoad3
  dataPayLoad3 = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: idArticles3
      }
    },
    series: [
      {
        name: "series-1",
        data: countDtPl3
      }
    ]
  }

  useEffect(() => {
    fetchListAnalytics();
    fetchListComement();
    fetchListNew();
  }, []);


  return (
    <div className='chart-container'>
      <div id='box'>
        <div className='box-panel'>
          <div className='my-grid'>
            <div className='my-row'>

              <div className='col-6'>
                <h5>Analytics visitor</h5>
                <Chart
                  options={dataPayload.options}
                  series={dataPayload.series}
                  type="bar "
                // width="500"
                />
              </div>

              <div className='col-6'>
                <h5>Analytics comment</h5>
                <Chart
                  options={dataPayload2.options}
                  series={dataPayload2.series}
                  type="bar"
                // width="500"
                />
              </div>
            </div>
            <div className='my-row'>
              <h5>Analytics jounalist</h5>
              <Chart
                options={dataPayLoad3.options}
                series={dataPayLoad3.series}
                type="heatmap"
              // width="500"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default AnalyticVistitor_Chart


// 1) Bar
// 2) Line
// 3) Area
// 4) Radar
// 5) Histogram
// 6) Scatter
// 7) Heatmap 
