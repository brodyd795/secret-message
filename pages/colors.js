import React, {useState} from 'react';
import {ChromePicker} from 'react-color';

const styles = {
    colorDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    colorBlock: {
        width: '2.5rem',
        height: '2.5rem',
        margin: '.5rem 1.5rem'
    },
    row: {
        display: 'flex'
    },
    container: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        color: 'gray'
    },
    rowContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    rowHeading: {
        margin: '1rem',
        textTransform: 'uppercase'
    },
    pickerContainer: {
        marginLeft: '1rem',
        marginTop: '2rem'
    },
    demoBlock: {
        height: '8rem',
        width: '8rem',
        display: 'flex',
        alignItems: 'center'
    },
    pickerAndDemoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    demoDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '2rem',
        textAlign: 'center',
        border: '1px solid gray',
        borderRadius: '5px'
    },
    pickerCode: {
        textAlign: 'center',
        marginTop: '1rem',
        marginBottom: '.5rem'
    },
    copyCode: {
        padding: '.5rem',
        color: '#1e1e1e',
        width: '100%',
        height: '100%'
    },
    showHideButton: {
        marginBottom: '1rem'
    }
};

const Color = ({color}) => {
    const hexColor = color[0] === '#' ? color : `#${color}`;

    return (
        <div style={styles.colorDiv}>
            <div
                style={{
                    ...styles.colorBlock,
                    backgroundColor: hexColor
                }}
            />
            <span>{hexColor}</span>
        </div>
    );
};

const Row = ({colors, heading}) =>
    <div style={styles.rowContainer}>
        <span style={styles.rowHeading}>{heading}</span>
        <div style={styles.row}>
            {colors.map((color) =>
                <Color
                    key={color}
                    color={color}
                />
            )}
        </div>
    </div>;

const colors = {
    primary: [
        '1f2937',
        '1c4073',
        '1e4f94',
        '#2b68bd',
        '4082de'
    ],
    neutral: [
        '1f1f1f',
        '3b3b3b',
        '575757',
        '737373',
        '949494',
        'b8b8b8',
        'd1d1d1'
    ],
    // danger: [

    // ]
};

const PickerContainer = () => {
    const [pickerColor, setPickerColor] = useState('#1B32D2');
    const [isShowingPicker, setIsShowingPicker] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(pickerColor);
        setCopySuccess(true);

        setTimeout(() => {
            setCopySuccess(false);
        }, 2000);
    };

    return (
        <div style={styles.pickerContainer}>
            <button
                type={'button'}
                onClick={() => setIsShowingPicker(!isShowingPicker)}
                style={styles.showHideButton}
            >
                {`${isShowingPicker ? 'Hide' : 'Show'} Color Picker`}
            </button>
            {isShowingPicker &&
                <div style={styles.pickerAndDemoContainer}>
                    <ChromePicker
                        color={pickerColor}
                        onChangeComplete={(color) => setPickerColor(color.hex)}
                        onChange={(color) => setPickerColor(color.hex)}
                    />
                    <div style={styles.demoDiv}>
                        <div style={{...styles.demoBlock, backgroundColor: pickerColor}}>
                            <button
                                type={'button'}
                                style={styles.copyCode}
                                onClick={handleCopy}
                            >
                                {copySuccess ? 'Copied!' : 'Click to copy hex code!'}
                            </button>
                        </div>
                        <span style={{...styles.pickerCode, color: pickerColor}}>{pickerColor}</span>
                    </div>
                </div>
            }
        </div>
    );
};

const Colors = () =>
    <div style={styles.container}>
        {Object.keys(colors).map((category) => (
            <Row
                key={category}
                colors={colors[category]}
                heading={category}
            />
        ))}
        <PickerContainer />
    </div>;

export default Colors;
