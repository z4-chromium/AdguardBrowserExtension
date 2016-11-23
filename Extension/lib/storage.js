/**
 * This file is part of Adguard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * Adguard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Adguard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Adguard Browser Extension.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global Log */

/**
 * localStorage interface. Implementation depends on browser
 */
adguard.localStorageImpl = adguard.localStorageImpl || (function () {

        function notImplemented() {
            throw new Error('Not implemented');
        }

        return {
            getItem: notImplemented,
            setItem: notImplemented,
            removeItem: notImplemented,
            hasItem: notImplemented
        };
    })();

/**
 * This class manages local storage
 */
adguard.localStorage = (function (impl) {

    var getItem = function (key) {
        return impl.getItem(key);
    };

    var setItem = function (key, value) {
        try {
            impl.setItem(key, value);
        } catch (ex) {
            Log.error("Error while saving item {0} to the localStorage: {1}", key, ex);
        }
    };

    var removeItem = function (key) {
        impl.removeItem(key);
    };

    var hasItem = function (key) {
        return impl.hasItem(key);
    };

    return {
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        hasItem: hasItem
    };

})(adguard.localStorageImpl);

/**
 * Rules storage interface. Implementation depends on browser
 */
adguard.rulesStorageImpl = adguard.rulesStorageImpl || (function () {

        function notImplemented() {
            throw new Error('Not implemented');
        }

        return {
            read: notImplemented,
            write: notImplemented
        };

    })();

/**
 * This class manages storage for filters.
 */
adguard.rulesStorage = (function (impl) {

    function getFilePath(filterId) {
        return "filterrules_" + filterId + ".txt";
    }

    /**
     * Loads filter from the storage
     *
     * @param filterId  Filter identifier
     * @param callback  Called when file content has been loaded
     */
    var read = function (filterId, callback) {
        var filePath = getFilePath(filterId);
        impl.read(filePath, function (e, rules) {
            if (e) {
                Log.error("Error while reading rules from file {0} cause: {1}", filePath, e);
            }
            callback(rules);
        });
    };

    /**
     * Saves filter rules to storage
     *
     * @param filterId      Filter identifier
     * @param filterRules   Filter rules
     * @param callback      Called when save operation is finished
     */
    var write = function (filterId, filterRules, callback) {
        var filePath = getFilePath(filterId);
        impl.write(filePath, filterRules, function (e) {
            if (e) {
                Log.error("Error writing filters to file {0}. Cause: {1}", filePath, e);
            }
            callback();
        });
    };

    return {
        read: read,
        write: write
    };

})(adguard.rulesStorageImpl);