import { useEffect, useState } from 'react'
import { Camera } from 'expo-camera'
import {
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  View,
} from 'react-native'
import {} from 'react-native'
import VerticalSlider from 'rn-vertical-slider'

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false)
  const [camera, setCamera] = useState<Camera>(null)
  const [value, setValue] = useState(0)
  const [visible, setVisible] = useState(false)
  console.log(
    '🚀 ~ file: CameraScreen.tsx:11 ~ CameraScreen ~ visible:',
    visible
  )

  const [ratio, setRatio] = useState('1:1')

  useEffect(() => {
    async function getCameraStatus() {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status == 'granted')
    }
    getCameraStatus()
  }, [])
  useEffect(() => {
    if (!camera) return
    async function getRatio() {
      const ratios = await camera.getSupportedRatiosAsync()
      const r = ratios.slice(-1)[0]
      setRatio(r)
    }
    getRatio()
  }, [hasPermission])

  const { width } = useWindowDimensions()
  const [w, h] = ratio.split(':')
  const height = Math.round((width * +w) / +h)

  function pressHandler() {
    // setVisible((current) =>
    //   current === false? true : false
    // )
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
      }, 7000)
    }
  }

  return (
    <Camera
      type={1}
      zoom={value}
      ratio={ratio}
      ref={(ref) => {
        setCamera(ref)
      }}
      style={{
        height: height,
        width: '100%',
        flex: 1,
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end'
      }}
    >
      <Pressable style={{ zIndex: 0.5, flex: 1 }} onPress={pressHandler}>
        {visible && (
          <View
            style={{
              marginVertical: 300,
              flex: 1,
              alignSelf: 'flex-end',
              // alignItems: 'center',
            }}
          >
            <VerticalSlider
              // disabled
              value={value}
              onChange={(value) => setValue(value)}
              onComplete={() => alert(111)}
              height={height / 2}
              width={37}
              step={0.01}
              min={0}
              max={0.5}
              borderRadius={5}
              minimumTrackTintColor='rgba(33,33,173, 0.3)'
              maximumTrackTintColor='rgba(33,33,33, 0.4)'
              showBallIndicator={false}
              ballIndicatorColor='#2979FF'
              ballIndicatorTextColor='#fff'
              ballIndicatorWidth={80}
              ballIndicatorHeight={40}
            />
          </View>
        )}
      </Pressable>
    </Camera>
  )
}

export default CameraScreen
