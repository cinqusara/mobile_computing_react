import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "./MyColors";

const { width, height } = Dimensions.get("screen");

export const STYLES = StyleSheet.create({
  //stile in comune
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  textBold: {
    fontWeight: "bold",
  },

  title: {
    fontSize: 15,
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
    marginTop: 30,
    height: 1,
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
    marginTop: 100,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  //STILE NEW POST
  titleViewNewPost: {
    height: 80,
    marginTop: 40,
  },

  middleViewNewPost: {
    alignItems: "center",
    flex: 1,
  },

  bottomViewNewPost: {
    marginTop: 90,
    bottom: 0,
  },

  fontSizeNewPost: {
    fontSize: 13,
  },

  viewComment: {
    height: 60,
    width: "80%",
    padding: 10
  }
});
