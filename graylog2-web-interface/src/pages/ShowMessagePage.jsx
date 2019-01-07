import PropTypes from 'prop-types';
import React from 'react';
import Reflux from 'reflux';
import Immutable from 'immutable';
import MessageShow from 'components/search/MessageShow';
import { DocumentTitle, Spinner } from 'components/common';

import ActionsProvider from 'injection/ActionsProvider';
const NodesActions = ActionsProvider.getActions('Nodes');

const MessagesActions = ActionsProvider.getActions('Messages');

import StoreProvider from 'injection/StoreProvider';
const NodesStore = StoreProvider.getStore('Nodes');
const StreamsStore = StoreProvider.getStore('Streams');

// eslint-disable-next-line no-unused-vars
const MessagesStore = StoreProvider.getStore('Messages');

const ShowMessagePage = React.createClass({
  propTypes: {
    params: PropTypes.object,
    searchConfig: PropTypes.object.isRequired,
  },
  mixins: [Reflux.connect(NodesStore)],
  getInitialState() {
    return {
      streams: undefined,
      inputs: undefined,
      message: undefined,
    };
  },
  componentDidMount() {
    MessagesActions.loadMessage.triggerPromise(this.props.params.index, this.props.params.messageId).then((message) => {
      this.setState({ message: message });
    });
    StreamsStore.listStreams().then((streams) => {
      const streamsMap = {};
      streams.forEach((stream) => {
        streamsMap[stream.id] = stream;
      });
      this.setState({ streams: Immutable.Map(streamsMap) });
    });
    NodesActions.list.triggerPromise();
  },
  _isLoaded() {
    return this.state.message && this.state.streams && this.state.nodes;
  },
  render() {
    if (this._isLoaded()) {
      return (
        <DocumentTitle title={`Message ${this.props.params.messageId} on ${this.props.params.index}`}>
          <MessageShow message={this.state.message} inputs={Immutable.Map()} nodes={Immutable.Map(this.state.nodes)}
                       streams={this.state.streams} allStreamsLoaded searchConfig={this.props.searchConfig} />
        </DocumentTitle>
      );
    }
    return <Spinner />;
  },
});

export default ShowMessagePage;
