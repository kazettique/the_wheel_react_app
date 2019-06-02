import React from 'react'
import Container from 'react-bootstrap/Container'
// Import Components
import BackerCommentCard from '../components/BackerCommentCard'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function CourseComment() {
  return (
    <>
      <Container fluid>
        <Container>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text-center">
                對這個課程有任何問題嗎？先看看<strong>問與答</strong>
                或是直接在下面留言！
              </Form.Label>
              <Form.Control type="textarea" placeholder="請輸入留言內容" />
              <Form.Text className="text-muted text-right">
                留言區為討論課程內容用。請勿張貼私下交易（含揪團）、廣告、個資、或其他違反使用條款的內容。
              </Form.Text>
            </Form.Group>
            <div className="text-right">
              <Button variant="secondary" type="submit">
                送出
              </Button>
            </div>
          </Form>
        </Container>
        <BackerCommentCard />
        <BackerCommentCard />
      </Container>
    </>
  )
}

export default CourseComment
