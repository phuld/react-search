import React, { useEffect, useState } from 'react';
import classes from './Search.module.css';
import axios from 'axios';

function Search() {

    const [filter, setFilter] = useState('');
    const [result, setResult] = useState([])

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('http://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: filter
                }
            })
            setResult(data.query.search)
        }
        if(filter) {
            search()
        }
    }, [filter])

    const handleChange = (e) => {
        setFilter(e.target.value)
    }

    const renderResult = result.map((item, index) => (
        <div className={classes.item} key={index}>
            <div className={classes.header}>
                {item.title}
            </div>
        </div>
    ))

    return (
        <>
            <div className={classes.field}>
                <label>Enter Search filter:</label>
                <input
                    type="text"
                    placeholder="Search here"
                    className={classes.search}
                    value={filter}
                    onChange={handleChange} />
            </div>
            <div className={classes.list}>
                {renderResult}
            </div>
        </>
    )
}

export default Search
