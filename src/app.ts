import $ from 'jquery'
import createBookReview from './createBookReview'

export type Review = {
  id: number;
  username: string;
  comment: string;
  like: number;
}

export type Book = {
  id: number;
  title: string;
  author: string;
  overview: string;
  image: string;
  reviews: Review[];
}

$(function() {
  $.ajax('http://localhost:1323/books')
    .done(function(books) {
      books.forEach(appendBook)

      $('.js-toggle-review').on('click', function(event) {
        var bookId = $(this).data('bookId')
        $('.js-review[data-book-id="' + bookId + '"]').toggle('fast')

        return false
      })

      $(document).on('click', '.js-like', function(event) {
        var likeCountElement = $(this).find('.js-like-count')
        likeCountElement.text(likeCountElement.text() + 1)

        return false
      })

      $(document).on('submit', '.js-form', function(event) {
        var bookId = $(this).data('bookId')
        $.ajax({
          url: 'http://localhost:1323/reviews',
          type: 'post',
          dataType: 'json',
          data: {
            comment: $(event.currentTarget).find('textarea').val()
          }
        }).done(function(review) {
          $('.js-review[data-book-id="' + bookId + '"] > ul').append($(createBookReview(review)))
        })

        return false
      })
    })
})

function appendBook(book: Book) {
  $('#js-book-list').append($(
    '<li class="book-list__item">' +
      '<div class="book-list__item__inner">' +
        '<img class="book-list__item__inner__image" src="' + book.image + '" alt="' + book.title + '">' +
        '<div class="book-list__item__inner__info">' +
          '<h3 class="book-list__item__inner__info__title">' +
            book.title +
            '<span class="book-list__item__inner__info__title__author">(' + book.author + ')</span>' +
          '</h3>' +
          '<p class="book-list__item__inner__info__overview">' + book.overview + '</p>' +
          '<p class="book-list__item__inner__info__comment">' +
            '<a href="#" class="book-list__item__inner__info__comment__link js-toggle-review" data-book-id="' + book.id + '">' +
              book.reviews.length + '件の感想・評価' +
            '</a>' +
          '</p>' +
        '</div>' +
      '</div>' +
      '<div class="review js-review" data-book-id="' + book.id + '">' +
        '<ul class="review__list">' + book.reviews.map(createBookReview).join('') + '</ul>' +
        '<form class="review__form js-form" data-book-id="' + book.id + '">' +
          '<textarea class="review__form__input" rows="5" placeholder="「' + book.title + '」を読んだ感想・評価を教えてください"></textarea>' +
          '<button class="review__form__submit" type="submit">投稿</button>' +
        '</form>' +
      '</div>' +
    '</li>'
  ))
}