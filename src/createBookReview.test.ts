import $ from 'jquery'
import createBookReview from './createBookReview';
import {Review} from './app'

describe("createBookReview()", () => {
  const review: Review = {
    id: 1,
    username: "テストユーザ",
    comment: "hoge",
    like: 3
  }
  test('shoud return DOM element', () => {
    document.body.innerHTML = `<ul>${createBookReview(review)}</ul>`
    expect($('.review__list__item').length).toBe(1)
  })
})