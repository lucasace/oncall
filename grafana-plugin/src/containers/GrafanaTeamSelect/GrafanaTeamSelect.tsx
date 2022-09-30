import React from 'react';

import { Icon, Label, Tooltip } from '@grafana/ui';
import cn from 'classnames/bind';
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';

import PluginLink from 'components/PluginLink/PluginLink';
import GSelect from 'containers/GSelect/GSelect';
import { WithPermissionControl } from 'containers/WithPermissionControl/WithPermissionControl';
import { GrafanaTeam } from 'models/grafana_team/grafana_team.types';
import { useStore } from 'state/useStore';
import { UserAction } from 'state/userAction';

import styles from './GrafanaTeamSelect.module.css';

const cx = cn.bind(styles);

interface GrafanaTeamSelectProps {}

const GrafanaTeamSelect = observer((props: GrafanaTeamSelectProps) => {
  const store = useStore();

  const { userStore, grafanaTeamStore } = store;
  const grafanaTeams = grafanaTeamStore.getSearchResult();
  const user = userStore.currentUser;

  if (!grafanaTeams || !user) {
    return null;
  }

  const onTeamChange = async (teamId: GrafanaTeam['id']) => {
    await userStore.updateCurrentUser({ current_team: teamId });
    window.location.reload();
  };

  return document.getElementsByClassName('page-header__inner')[0]
    ? ReactDOM.createPortal(
        <div className={cx('teamSelect')}>
          <div className={cx('teamSelectLabel')}>
            <Label>
              Select Team{' '}
              <Tooltip content="The objects on this page are filtered by team and you can only view the objects that belong to your team. Note that filtering within Grafana OnCall is meant for usability, not access management.">
                <Icon name="info-circle" size="md" className={cx('teamSelectInfo')}></Icon>
              </Tooltip>
            </Label>
            <WithPermissionControl userAction={UserAction.TeamsWrite}>
              <PluginLink path="/org/teams" className={cx('teamSelectLink')}>
                Edit teams
              </PluginLink>
            </WithPermissionControl>
          </div>
          <GSelect
            modelName="grafanaTeamStore"
            displayField="name"
            valueField="id"
            placeholder="Select Team"
            className={cx('select', 'control')}
            value={user.current_team}
            onChange={onTeamChange}
          />
        </div>,
        document.getElementsByClassName('page-header__inner')[0]
      )
    : null;
});

export default GrafanaTeamSelect;
