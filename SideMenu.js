'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  PanResponder,
  LayoutAnimation,
  Text,
  View,
} = React;

var SideMenu = React.createClass({

  _panResponder: {},
  _previousLeft: 0,
  _previousTop: 0,
  _sideViewStyles: {},

  sideView: React.Element,

  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });

    this._previousLeft = 0;
    this._previousTop = 0;
    this._sideViewStyles = {
      left: this._previousLeft,
      top: this._previousTop,
    };
  },

  componentDidMount: function() {
    this._updatePosition();
  },

  _updatePosition: function() {
    this.sideView && this.sideView.setNativeProps(this._sideViewStyles);
  },

  _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user presses down on the circle?
    return true;
  },

  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    return true;
  },

  _handlePanResponderGrant: function(e: Object, gestureState: Object) {
  },

  _handlePanResponderMove: function(e: Object, gestureState: Object) {
    this._sideViewStyles.left = this._previousLeft + gestureState.dx; 
    if(this._sideViewStyles.left < 0) {
      return;
    }
   
    this._updatePosition();
  },
  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    var config = layoutAnimationConfigs[0];
    LayoutAnimation.configureNext(config);
    this._sideViewStyles.left = gestureState.dx > (320 / 4) ? 240 : 0;
    this._updatePosition();
    this._previousLeft = this._sideViewStyles.left;
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View 
        style={styles.sideView}
        >
        {this.props.sideView}
        </View>
        <View 
        ref={(sideView) => {
          this.sideView = sideView
        }}
        style={styles.frontView}
        {...this._panResponder.panHandlers}>
        {this.props.frontView}
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  sideView: {
    flex: 1,
    width: 320,
    height: 568,
    backgroundColor: "#dddddd",
    position: 'absolute',
    top: 0,
    left: 0,
  },
  frontView: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: "#ffffff",
    width: 320,
    height: 568,
  }
});

var animations = {
  layout: {
    spring: {
      duration: 0.5,
      create: {
        duration: 0.3,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    },
    easeInEaseOut: {
      duration: 0.3,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 0.1,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};


var layoutAnimationConfigs = [
  animations.layout.spring,
  animations.layout.easeInEaseOut,
];

module.exports = SideMenu;
