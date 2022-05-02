import React from 'react';
import ModelMenu from './ModelMenu';
import { useDispatch, useSelector } from 'react-redux';
import { changeStateHome, changeStateIntroduce, changeStateModelMenu } from '../Redux/action/closeOpenComponet';

function Taskbar() {
  const dispatch = useDispatch()
  const stateModelMenu = useSelector(state => state.opencloseCPN.isChangStateModelMenu)

  const renderMenu = () =>{
    if(stateModelMenu){
      return <ModelMenu/>
    }
  }
  const clickMenu = () =>{
    dispatch(changeStateModelMenu())
   
  }
  const clickIntroduce = () =>{
    dispatch(changeStateIntroduce())
    dispatch(changeStateHome())
  }


    return (
        <div className="taskbar">
        <nav className="taskbar_nav">
          <div>
            <ul className="nav_ul">
              <li className="nav_ul_li">
                <div className="bm_FG" as="/">
                  <a href="/" ><span>Nóng</span></a>
                </div>
              </li>
              <li className="nav_ul_li" onClick = {clickIntroduce}>
                <div className="bm_FG" as="/">
                  <a><span>Giới Thiệu</span></a>
                </div>
              </li>
              <li className="nav_ul_li" onClick = {clickMenu}>
                <div className="bm_FG" as="/">
                  <a><span>Chủ Đề</span></a>
                </div>
              </li>
              <li className="nav_ul_li more">
                <div className="bm_FG" as="/">
                  <a href="/" className><span>Phòng chống dịch COVID-19</span></a>
                </div>
              </li>
              <li className="nav_ul_li more">
                <div className="bm_FG" as="/">
                  <a href="/" className><span>Năng lượng tích cực</span></a>
                </div>
              </li>
              <li className="nav_ul_li more">
                <div className="bm_FG" as="/">
                  <a href="/" className><span>Khám phá Việt Nam</span></a>
                </div>
              </li>
              <li className="nav_ul_li more">
                <div className="bm_FG" as="/">
                  <a href="/" className><span>Khám phá thế giới</span></a>
                </div>
              </li>
              <li className="nav_ul_li" onClick = {clickMenu}>
                <div className="bm_FG" as="/">
                  <i className="bx bx-menu" />
                </div>
                {renderMenu()}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
}

export default Taskbar