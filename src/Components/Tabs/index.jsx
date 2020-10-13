import React, {Fragment, useState} from 'react'
import {TabContainer, TabContent, TabContentItem, TabItem, TabList} from "./style";

export default ({data, formError}) => {
  const [activeTab, setActiveTab] = useState(data[0].id)

  const handleActiveTab = (id) => {
    setActiveTab(id)
  }

  return (
    <TabContainer>
      <TabList>
        {
          data.map(item => (
            <TabItem
              key={item.id}
              onClick={() => handleActiveTab(item.id)}
              active={activeTab === item.id}
              formError={formError[item.id]}
            >
              {item.title}
            </TabItem>
          ))
        }
      </TabList>
      <TabContent>
        {
          data.map(item => (
            <TabContentItem
              active={activeTab === item.id}
              key={item.id}
            >
              {
                item.components.map((component, idx) => (
                  <Fragment key={idx}>
                    {component}
                  </Fragment>
                ))
              }

            </TabContentItem>
          ))
        }
      </TabContent>
    </TabContainer>
  )
}