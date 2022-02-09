import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "./MyColors";

const { width, height } = Dimensions.get("screen");

export const STYLES = StyleSheet.create({
  //stile in comune
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  container2: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  textBold: {
    fontWeight: "bold",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  //stile per il profilo

  inputContainer: {
    marginVertical: 30,
  },

  userInfoSection: {
    paddingHorizontal: 30,
    paddingTop: 30,
    marginBottom: 25,
    alignItems: "center",
  },

  userNameTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  containerBtnChangeImg: {
    right: -20,
  },

  floatingButtonChangeImg: {
    position: "absolute",
    width: 20,
    height: 20,
    bottom: 20,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: COLORS.white,
    elevation: 5,
  },

  containerTextInputName: {
    marginTop: 5,

    alignItems: "center",
  },

  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    textAlign: "center",
  },

  newUserNameInput: {
    borderColor: COLORS.black,
    borderWidth: 1,
    width: width / 1.3,
    padding: 10,
  },

  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  commitChangesBtn: {
    marginTop: 5,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  textInputName: {
    width: 200,
  },

  //STILE NEW POST
  titleViewNewPost: {
    marginTop: 40,
  },

  middleViewNewPost: {
    alignItems: "center",
    flex: 1,
  },

  bottomViewNewPost: {
    marginTop: 40,
    bottom: 0,
  },

  fontSizeNewPost: {
    fontSize: 13,
  },

  viewComment: {
    width: "80%",
  },

  innerContainerNewPost: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 40,
  },

  floatingButtonBack: {
    alignItems: "center",
    justifyContent: "center",
    width: 37,
    height: 37,
    bottom: 35,
    borderRadius: 40,
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: COLORS.primaryColor,
  },

  //STILE IN POST
  infoLine: {
    width: 220,
  },

  boxPost: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.lightColor,
    marginTop: 10,
    padding: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.darkColor,
    height: 180,
  },

  userInfoSection: {
    margin: 10,
    marginBottom: 25,
  },

  dateTime: {
    fontSize: 11,
    color: COLORS.darkGrey,
    textAlign: "center",
  },

  commentPost: {
    backgroundColor: COLORS.white,
    height: 60,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS.darkColor,
  },

  textComment: {
    fontSize: 12,
  },

  fabPost: {
    position: "absolute",
    margin: 22,
    right: 0,
    bottom: 7,
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
  },

  iconPost: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  //BACHECA
  containerFlatList: {
    height: 490,
    width: "90%",
  },

  floatingButtonAddPost: {
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 10,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: COLORS.darkColor,
    right: -180,
    elevation: 5,
  },

  titleLineSelected: {
    fontWeight: "bold",
    color: COLORS.white,
    textAlignVertical: "center",
  },

  iconBacheca: {
    padding: 14,
  },

  containerTopElementBacheca: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    backgroundColor: COLORS.primaryColor,
    width: "100%",
  },

  topButtonBacheca: {
    backgroundColor: COLORS.white,
    borderRadius: 40,
  },

  //PAGINA NO CONNECTION
 

  imgNoConnection: {
    width: "30%",
    height: "30%",
  },

  //MAP

  floatingButtonMap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 60,
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: COLORS.primaryColor,
    bottom: -220,
  },

  containerMap: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  //LINE

  containerLine: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.lightGrey,
    margin: 10,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 3,
  },
});
