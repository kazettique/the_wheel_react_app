import React from 'react'
// Components
import CourseInfo from '../containers/CourseInfo'
import CourseQandA from '../containers/CourseQandA'
import CourseUpdate from '../containers/CourseUpdate'
import CourseComment from '../containers/CourseComment'
// import CourseBackItForm from '../containers/CourseBackItForm'
import CoachInfo from '../containers/CoachInfo'
// Stylesheet
import './components.css'
// React Bootstrap
import Container from 'react-bootstrap/Container'
// React Tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

class CourseTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      course: this.props.course[0],
    }
  }

  render() {
    return (
      <>
        {/*<Router>*/}
        <Container>
          <div className="d-flex justify-content-end mr-lg-5">
            <Container fluid>
              <Tabs>
                <TabList>
                  <Tab>課程介紹</Tab>
                  <Tab>教練介紹</Tab>
                  <Tab>問與答</Tab>
                  <Tab>專案更新</Tab>
                  <Tab>留言</Tab>
                </TabList>
                <TabPanel>
                  <CourseInfo courseInfo={this.state.course.c_intro} />
                </TabPanel>
                <TabPanel>
                  <CoachInfo />
                </TabPanel>
                <TabPanel>
                  <CourseQandA />
                </TabPanel>
                <TabPanel>
                  <CourseUpdate />
                </TabPanel>
                <TabPanel>
                  <CourseComment />
                </TabPanel>
              </Tabs>
            </Container>
          </div>
        </Container>
      </>
    )
  }
}

export default CourseTab
