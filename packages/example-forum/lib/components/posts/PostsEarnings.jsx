import { Components, registerComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Posts } from '../../modules/posts/index.js';
import Alert from 'react-bootstrap/lib/Alert'
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import classNames from 'classnames';

const Error = ({error}) => <Alert className="flash-message" bsStyle="danger"><FormattedMessage id={error.id} values={{value: error.value}}/>{error.message}</Alert>

const PostsEarnings = ({className, results, loading, currentUser, error, terms}) => {

  if (results && results.length) {
    return (
      <div className={classNames(className, 'posts-list', `posts-list-${terms.view}`)}>
         {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        <div className="posts-list-content">
          {results.map(post =>  post)}
        </div>
      </div>
    )
  } else if (loading) {
    return (
      <div className={classNames(className, 'posts-list')}>
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        <div className="posts-list-content">
          <Components.PostsLoading/>
        </div>
      </div>
    )
  } else {
    return (
      <div className={classNames(className, 'posts-list')}>
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        <div className="posts-list-content">
          <Components.PostsNoResults/>
        </div>
      </div>
    )  
  }
  
};

PostsEarnings.displayName = "PostsEarnings";

PostsEarnings.propTypes = {
  results: PropTypes.array,
  terms: PropTypes.object,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
  showHeader: PropTypes.bool,
};

PostsEarnings.contextTypes = {
  intl: intlShape
};

const options = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'PostsEarnings',
};

registerComponent('PostsEarnings', PostsEarnings, withCurrentUser, [withList, options]);
