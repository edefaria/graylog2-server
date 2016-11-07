import React, {PropTypes} from 'react';
import {SplitButton, MenuItem} from 'react-bootstrap';
import ExtractorUtils from 'util/ExtractorUtils';

const MessageFieldSearchActions = React.createClass({
  propTypes: {
    fieldName: PropTypes.string.isRequired,
    message: PropTypes.object.isRequired,
    onLoadTerms: PropTypes.func.isRequired,
    onAddFieldToSearchBar: PropTypes.func.isRequired,
  },
  getInitialState() {
    this.newExtractorRoutes = ExtractorUtils.getNewExtractorRoutes(this.props.message.source_node_id,
      this.props.message.source_input_id, this.props.fieldName, this.props.message.index, this.props.message.id);

    return null;
  },
  _formatExtractorMenuItem(extractorType) {
    return (
      <MenuItem key={`menu-item-${extractorType}`} href={this.newExtractorRoutes[extractorType]}>
        {ExtractorUtils.getReadableExtractorTypeName(extractorType)}
      </MenuItem>
    );
  },
  render() {
    return (
      <div className="message-field-actions pull-right">
        <SplitButton pullRight
                     bsSize="xsmall"
                     title={<i className="fa fa-search-plus"/>}
                     key={1}
                     onClick={this.props.onAddFieldToSearchBar}
                     id={`more-actions-dropdown-field-${this.props.fieldName}`}>
          <MenuItem onSelect={this.props.onLoadTerms(this.props.fieldName)}>Show terms of {this.props.fieldName}</MenuItem>
        </SplitButton>
      </div>
    );
  },
});

export default MessageFieldSearchActions;
