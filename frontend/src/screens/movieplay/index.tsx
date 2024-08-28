// import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
// import Video from 'react-native-video';
// import React, { useEffect, useRef, useState } from 'react';

// const { width, height } = Dimensions.get('screen');

// const PlayMovie = ({ route }: { route: any }) => {
//     const { movieuri } = route.params;
//     const [videoloading,setvideoloading] = useState(false);
//     const videoRef = useRef<Video>(null);

//     useEffect(() => {
//         return () => {
//             // videoRef.current.
//         }
//     }, [])

//     return (
//         <View style={styles.container} >
//             <StatusBar backgroundColor={'transparent'} />
//             <Video
//                 source={{ uri: movieuri }}
//                 resizeMode='contain'
//                 ref={videoRef}
//                 controls

//                 // onBuffer={this.onBuffer}                // Callback when remote video is buffering
//                 // onError={this.videoError}
//                 // Callback when video cannot be loaded
//                 style={styles.backgroundVideo} />
//         </View>
//     );
// };

// export default PlayMovie;

// const styles = StyleSheet.create({
//     container: {
//         width,
//         height,
//     },
//     backgroundVideo: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//         height: height,
//         width: width,
//     },
// });

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Video, {OnBufferData} from 'react-native-video';

const {width, height} = Dimensions.get('screen');

const PlayMovie = ({route}: {route: any}) => {
  const {movieuri} = route.params;
  const [videoloading, setvideoloading] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    return () => {
      // Clean up code if needed
    };
  }, []);

  const onBuffer = (data: OnBufferData) => {
    console.log(data);
    setvideoloading(data.isBuffering);
  };

  const onLoad = () => {
    console.log('OnLoad');
    setvideoloading(false);
  };

  const onLoadStart = () => {
    console.log('onLoadStart');
    setvideoloading(true);
  };

  const onSeek = () => {
    setSeeking(true);
    console.log('Seek started');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} />
      <Video
        source={{uri: movieuri}}
        resizeMode="contain"
        ref={videoRef}
        controls
        onLoad={onLoad}
        onVideoLoadStart={() => {
          console.log('ssss');
        }}
        onLoadStart={onLoadStart}
        onBuffer={onBuffer}
        onSeek={onSeek}
        onPlaybackResume={() => {
          console.log('onPlaybackResume');
          setvideoloading(false);
          setSeeking(false);
        }}
        onVideoBuffer={() => {
          console.log('bgg');
        }}
        onVideoLoad={() => {
          console.log('Loading xxx');
        }}
        onVideoSeek={() => {
          console.log('Bsddf');
        }}
        style={styles.backgroundVideo}
      />
      {(videoloading || seeking) && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </View>
  );
};

export default PlayMovie;

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: height,
    width: width,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
