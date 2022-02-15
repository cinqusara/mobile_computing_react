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

  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    textAlign: "center",
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

  divider: {
    width: 1,
    backgroundColor: COLORS.black,
  },

  //stile per il profilo

  inputContainer: {
    marginVertical: 30,
  },

  mainContainerProfile: {
    alignContent: "center",
    alignItems: "center",
    marginTop: "36%",
    backgroundColor: COLORS.white,
    borderRadius: 50,
    width: 405,
    right: 5,
    height: "100%",
    paddingTop: 50,
    borderWidth: 5,
    borderColor: COLORS.black,
  },

  userImgSection: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    height: 10,
  },

  userNameTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  containerBtnChangeImg: {
    right: -20,
  },

  nameView: {
    paddingTop: 60,
  },

  floatingButtonChangeImg: {
    position: "absolute",
    width: 40,
    height: 40,
    bottom: -30,
    left: 10,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: COLORS.lightColor2,
    elevation: 5,
  },

  containerTextInputName: {
    bottom: 70,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
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

  labeTextInput: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },

  commitChangesBtn: {
    bottom: 25,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  helperTextName: {
    bottom: 130,
    position: "absolute",
  },

  textInputName: {
    width: 200,
  },

  wrappedBtn: {
    flexDirection: "row",
  },

  btnChangeName: {
    fontSize: 4,
  },

  //STILE NEW POST
  titleViewNewPost: {
    marginTop: 40,
  },

  titleNewPost: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.primaryColor,
  },

  middleViewNewPost: {
    alignItems: "center",
    flex: 1,
  },

  bottomViewNewPost: {
    marginTop: 100,
  },

  fontSizeNewPost: {
    fontSize: 13,
  },

  viewComment: {
    width: "80%",
    height: 60,
  },

  innerContainerNewPost: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 60,
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

  captionNewPost: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "bold",
    textAlign: "center",
  },

  //STILE IN POST
  infoLine: {
    width: 220,
  },

  infoLineOffPost: {
    width: 200,
  },

  titlePost: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  titleOffPost: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },

  boxPost: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.lightGrey,
    marginTop: 10,
    padding: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 5,
    borderColor: COLORS.primaryColor,
    height: 180,
  },

  boxPostFollow: {
    flex: 1,
    justifyContent: "center",
    marginTop: 10,
    padding: 3,
    backgroundColor: COLORS.lightGrey,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 5,
    borderColor: COLORS.lightColor2,
    height: 180,
  },

  officialPost: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.darkGrey,
    marginTop: 10,
    padding: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 5,
    borderColor: COLORS.black,
    height: 140,
  },

  bottomViewNewPost: {
    marginTop: 100,
  },

  userInfoSection: {
    margin: 10,
    marginBottom: 25,
  },

  dateTime: {
    fontSize: 10.7,
    color: COLORS.darkGrey,
  },

  dateTimeOffPost: {
    fontSize: 11,
    color: COLORS.lightGrey2,
  },

  commentPost: {
    backgroundColor: COLORS.white,
    height: 60,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS.darkColor,
    marginBottom: 5,
  },

  textComment: {
    fontSize: 10.7,
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
    backgroundColor: COLORS.secondaryColor,
  },

  fabPostFollow: {
    position: "absolute",
    margin: 22,
    right: 0,
    bottom: 7,
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    backgroundColor: COLORS.lightColor2,
  },

  fabOfficialPost: {
    position: "absolute",
    margin: 22,
    bottom: -50,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    backgroundColor: COLORS.black,
  },

  iconPost: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  viewDateOffPost: {
    padding: 4,
  },

  captionOffPost: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    textAlign: "center",
    textAlign: "center",
  },

  //OFFICIAL POST

  imgOffPost: {
    width: "20%",
    height: "20%",
  },

  viewOffPostSelected: {
    paddingTop: 20,
  },

  viewInfoOffPost: {
    marginTop: 30,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    width: 350,
  },

  textBoldOffPost: {
    fontWeight: "bold",
    textAlign: "center",
  },

  floatingButtonBackOffPost: {
    alignItems: "center",
    justifyContent: "center",
    width: 37,
    height: 37,
    borderRadius: 40,
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: COLORS.primaryColor,
  },

  viewBackBtnOffPost: {
    marginTop: 200,
  },

  //BACHECA
  containerFlatList: {
    height: 550,
    //se è secondo dispositivo mettere 490
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
    backgroundColor: COLORS.lightColor2,
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

  //NO LINE SELECTED
  imgOfficers: {
    width: "50%",
    height: "50%",
  },

  containerNoLine: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  alerNoLine: {
    fontSize: 15,
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
    textAlign: "center",
  },

  textBoldLine: {
    fontWeight: "bold",
    textAlign: "center",
  },

  imgTrain: {
    width: "30%",
    height: "30%",
  },
});
