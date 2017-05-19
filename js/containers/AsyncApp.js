import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class AsyncApp extends Component {
  constructor(props) {

    // When implementing the constructor for a React.Component subclass,
    // you should call super(props) before any other statement.
    // Otherwise, this.props will be undefined in the constructor
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  // The componentDidMount() hook runs after the component output has been rendered to the DOM.
  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  // The componentDidUpdate() is invoked immediately after updating occurs.
  // This method is not called for the initial render.
  componentDidUpdate(prevProps) {

    // You can always extract code of inner if operator to perform.
    // Because, the condition of if operator and behavior of onChange of <Picker> element are equal.
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))

    // This's extra code from official example I think
    // this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Picker value={selectedSubreddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
        <p>
          {/* true && expression always evaluates to expression,
              and
              false && expression always evaluates to false. */}
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log(JSON.stringify(state));
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

/*
 * connect() does not modify the component class passed to it;
 * instead, it returns a new, connected component class for you to use.
 *
 * mapStateToProps() : If this argument is specified, the new component will subscribe to Redux store updates.
 *                     This means that any time the store is updated, mapStateToProps() will be called.
 *
 * mapDispatchToProps() : If you omit it, the default implementation
 *                        just injects dispatch() into your component’s props.
 */
export default connect(mapStateToProps)(AsyncApp)
