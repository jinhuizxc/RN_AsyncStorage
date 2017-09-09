/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * 验证用户登录状态！
 */

/**
 * AsyncStorage是一个简单的、异步的、持久化的Key-Value存储系统，它对于App来说是全局性的！
 *
 * static getItem(key: string, callback?: ?(error: ?Error, result: ?string) => void)
 * 读取key字段并将结果作为第二个参数传递给callback。如果有任何错误发生，则会传递一个Error对象作为第一个参数。返回一个Promise对象。
 * static setItem(key: string, value: string, callback?: ?(error: ?Error) => void)
 * 将key字段的值设置成value，并在完成后调用callback函数。如果有任何错误发生，则会传递一个Error对象作为第一个参数。返回一个Promise对象。
 * static removeItem(key: string, callback?: ?(error: ?Error) => void)
 * 删除一个字段。返回一个Promise对象。
 * static mergeItem(key: string, value: string, callback?: ?(error: ?Error) => void)
 * 假设已有的值和新的值都是字符串化的JSON，则将两个值合并。返回一个Promise对象。还没有被所有原生实现都支持。
 * static clear(callback?: ?(error: ?Error) => void)
 * 删除全部的AsyncStorage数据，不论来自什么库或调用者。通常不应该调用这个函数——使用removeItem或者multiRemove来清除你自己的key。返回一个Promise对象。
 * static getAllKeys(callback?: ?(error: ?Error, keys: ?Array<string>) => void)
 * 获取所有本应用可以访问到的数据，不论来自什么库或调用者。返回一个Promise对象。
 * static flushGetRequests()
 * 清除所有进行中的查询操作。
 * static multiGet(keys: Array<string>, callback?: ?(errors: ?Array<Error>, result: ?Array<Array<string>>) => void)
 * 获取keys所包含的所有字段的值，调用callback回调函数时返回一个key-value数组形式的数组。返回一个Promise对象。
 * multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
 * static multiSet(keyValuePairs: Array<Array<string>>, callback?: ?(errors: ?Array<Error>) => void)
 * multiSet和multiMerge都接受一个与multiGet输出值一致的key-value数组的数组。返回一个Promise对象。
 * multiSet([['k1', 'val1'], ['k2', 'val2']], cb);
 * static multiRemove(keys: Array<string>, callback?: ?(errors: ?Array<Error>) => void)
 * 删除所有键在keys数组中的数据。返回一个Promise对象。
 * static multiMerge(keyValuePairs: Array<Array<string>>, callback?: ?(errors: ?Array<Error>) => void)
 * 将多个输入的值和已有的值合并，要求都是字符串化的JSON。返回一个Promise对象。
 * 还没有被所有原生实现都支持。
 */
import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TouchableHighlight,
    ToastAndroid,
} from 'react-native';


var STORAGE_KEY_ONE = "helloworld";

class RN_AsyncStorage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    async _loadInitialState() {
        try {
            var value = await AsyncStorage.getItem(STORAGE_KEY_ONE);
            if (value != null) {
                ToastAndroid.show("有数据：" + value, ToastAndroid.LONG);
            } else {
                ToastAndroid.show("无数据", ToastAndroid.LONG);
            }
        } catch (error) {
            this._appendMessage('AsyncStorage错误' + error.message);
        }
    }

    async _saveValue_One() {
        try {
            await AsyncStorage.setItem(STORAGE_KEY_ONE, '添加数据');
        } catch (error) {
            this._appendMessage('AsyncStorage错误' + error.message);
        }

    }

    async _removeValue_One() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY_ONE);
        } catch (error) {
            this._appendMessage('AsyncStorage错误' + error.message);
        }

    }


    _appendMessage(message) {
        this.setState({messages: this.state.messages.concat(message)});
    }

    render() {
        return (
            <View>
                <Text onPress={this._saveValue_One}>添加数据</Text>
                <Text onPress={this._removeValue_One}>删除数据</Text>
            </View>
        );
    }
}

AppRegistry.registerComponent('RN_AsyncStorage', () => RN_AsyncStorage);
