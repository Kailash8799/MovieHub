import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import Play from 'react-native-vector-icons/Entypo';
import Chip from '../../components/chip/chip';
import { commonColor } from '../../utils/colors';
import { OnboardingItem } from '../../utils/constant';
import Actorcard from '../../components/cards/Actorcard';

const { width } = Dimensions.get('screen');
const IMAGE_HEIGHT = 400;


const MovieDetailsScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    const { image } = route.params;
    const desc = 'Venom: The Last Dance is an upcoming American superhero film featuring the Marvel Comics character Venom, produced by Columbia Pictures in association with Marvel, and distributed by Sony Pictures Releasing';
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollViewOffset = useScrollViewOffset(scrollRef);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(scrollViewOffset.value, [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT], [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0.75]);
        const scale = interpolate(scrollViewOffset.value, [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT], [1, 1, 1.5]);
        return {
            transform: [
                { translateY },
                { scale },
            ],
        };
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollViewOffset.value, [IMAGE_HEIGHT / 1.4, IMAGE_HEIGHT], [0, 1]);
        // const scale = interpolate(scrollViewOffset.value, [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT], [1, 1, 1.5]);
        return {
            backgroundColor: `rgba(42, 47, 61,${opacity})`,
            opacity: 1,
            zIndex: 20,
        };
    });

    return (
        <View style={styles.container} >
            <Animated.View style={[styles.headerwithstatusbar, headerAnimatedStyle]} >
                <View style={styles.statusbarheight} />
                <Animated.View style={[styles.header]} >
                    <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={styles.backbuton} >
                        <Icon name="angle-left" size={30} color={'#fff'} />
                        <Text style={styles.backtext} >Back</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity>

                </TouchableOpacity> */}
                </Animated.View>
            </Animated.View>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} showsVerticalScrollIndicator={false} >
                <View>
                    <Animated.Image style={[styles.image, imageAnimatedStyle]} sharedTransitionTag={'tag'} source={image} />
                </View>
                <View style={styles.bg}>
                    <View style={styles.titlestyle}>
                        <Text style={styles.titletext} >Venom 3</Text>
                        <TouchableOpacity>
                            <Icon name="bookmark" size={25} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.flex, styles.rating]} >
                        <View style={styles.flex}>
                            <Icon name="star" size={20} color={commonColor.primaryyellow} />
                            <Text style={styles.ratingtext} >9.8</Text>
                        </View>
                        <View style={[styles.flex]} >
                            <Chip name="2024" />
                            <Chip name="13+" />
                            <Chip name="INDIA" />
                        </View>
                    </View>
                    <View style={styles.bottombox} >
                        <TouchableOpacity activeOpacity={0.6} style={[styles.button, styles.playbutton]} >
                            <Play name="controller-play" color={'#fff'} size={20} />
                            <Text style={styles.text} >Play</Text>
                        </TouchableOpacity>
                        <View style={styles.space} />
                        <TouchableOpacity activeOpacity={0.6} style={[styles.button, styles.tolistbutton]} >
                            <Icon name="cloud-download" color={commonColor.primaryyellow} size={18} />
                            <Text style={[styles.text, { color: commonColor.primaryyellow }]} >Download</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.margin]}>
                        <Text>
                            {desc?.length > 140 ? desc.substring(0, 135) + '...' : desc}
                        </Text>
                    </View>
                    <View style={[styles.margin, styles.viewmoreflex]}>
                        <TouchableOpacity activeOpacity={0.5} >
                            <Text style={styles.viewmorecolor} >
                                View more
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.margin, styles.flex, styles.actorspace]} >
                        <View>
                            <Text style={[styles.actortext]} >Actors</Text>
                        </View>
                        <View style={[styles.flex, styles.actorspace]} >
                            <TouchableOpacity style={styles.margin} ><Icon name="angle-left" size={35} color={'#fff'} /></TouchableOpacity>
                            <View style={styles.space} />
                            <TouchableOpacity style={styles.margin} ><Icon name="angle-right" size={35} color={'#fff'} /></TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.actorlist} >
                        <Animated.FlatList
                            nestedScrollEnabled
                            data={OnboardingItem}
                            horizontal={true}
                            contentContainerStyle={styles.flatlistpadding}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ index, item }) => {
                                return <Actorcard
                                    key={index}
                                    index={index}
                                    navigation={navigation}
                                    image={item.image}
                                />;
                            }}
                        />
                    </View>
                    <View style={styles.horizontalspace} />
                </View>
            </Animated.ScrollView >
        </View>
    );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
    statusbarheight: {
        height: StatusBar.currentHeight,
    },
    container: {
        flex: 1,
    },
    backbuton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        left: 15,
    },
    headerwithstatusbar: {
        width,
        position: 'absolute',
        flex: 1,
        zIndex: 50,
    },
    header: {
        width,
        display: 'flex',
        zIndex: 50,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    backtext: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '400',
        marginLeft: 10,
    },
    bg: {
        backgroundColor: '#2a2f3d',
    },
    horizontalspace: {
        height: 40,
    },
    actortext: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginLeft: 3,
    },
    actorlist: {
        height: 160,
        marginTop: 10,
    },
    flatlistpadding: {
        paddingHorizontal: 8,
    },
    actorspace: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    viewmoreflex: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    viewmorecolor: {
        color: commonColor.primaryyellow,
    },
    margin: {
        marginHorizontal: 10,
    },
    space: {
        width: 15,
    },
    tolistbutton: {
        borderWidth: 1,
        borderColor: commonColor.primaryyellow,
    },
    playbutton: {
        backgroundColor: commonColor.primaryyellow,
    },
    text: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 3,
    },
    button: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 7,
        borderRadius: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottombox: {
        marginHorizontal: 10,
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingtext: {
        marginHorizontal: 5,
    },
    rating: {
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titletext: {
        fontSize: 23,
        fontWeight: '700',
    },
    titlestyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    image: {
        height: IMAGE_HEIGHT,
        width: width,
    },
});
