import { connect } from "react-redux";
import JsonEditor from "../components/jsonEditor";
import { setJsonData } from "../actions/jsonEditorActions";

interface StateProps {
    jsonData: any;
}

interface DispatchProps {
    setJsonData: (jsonData: any) => void;
}

const mapStateToProps = (state: { jsonEditor: StateProps }): StateProps => ({
    jsonData: state.jsonEditor.jsonData
});

const mapDispatchToProps: DispatchProps = {
    setJsonData
};

export default connect(mapStateToProps, mapDispatchToProps)(JsonEditor);
