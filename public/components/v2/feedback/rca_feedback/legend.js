import React, { Fragment } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiText,
  EuiTextColor,
  EuiSwitch,
  EuiCheckbox,
  EuiSpacer,
} from '@elastic/eui';

export const Legend = (props) => {
  return (
    <EuiFlexGroup direction="row" justifyContent="spaceBetween">
      <EuiFlexItem>
        <EuiSpacer size="m" />
        <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween" alignItems="center">
          <EuiFlexGroup direction="column" grow={false} gutterSize="xs" style={{ paddingLeft: 30 }}>
            <EuiFlexItem>
              <EuiFlexGroup gutterSize="none" direction="row" >
                <EuiFlexItem grow={false} style={{ minWidth: 60 }}>
                  <EuiFlexItem style={{ zoom: 0.8, "-moz-transform": "scale(0.8)" }}>
                    <EuiSwitch
                      checked={true}
                      onChange={() => { }}
                    />
                  </EuiFlexItem>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText size="s" color="subdued">
                    the event represents the <EuiTextColor color="danger"><span style={{ fontWeight: "bold" }}>root cause</span></EuiTextColor> of this incident.
                          </EuiText>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup gutterSize="none" direction="row">
                <EuiFlexItem grow={false} style={{ minWidth: 60 }}>
                  <EuiFlexItem style={{ zoom: 0.8, "-moz-transform": "scale(0.8)" }}>
                    <EuiSwitch
                      checked={false}
                      onChange={() => { }}
                    />
                  </EuiFlexItem>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText size="s" color="subdued">
                    the event represents a <EuiTextColor color="warning"><span style={{ fontWeight: "bold" }}>symptom</span></EuiTextColor>.
                          </EuiText>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup gutterSize="none" direction="row" >
                <EuiFlexItem grow={false} style={{ minWidth: 60, paddingLeft: 15 }}>
                  <EuiCheckbox
                    id="legendcheckboxChecked"
                    checked={true}
                    onChange={() => { }}
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText size="s" color="subdued">
                    the event is <EuiTextColor color="default"><span style={{ fontWeight: "bold" }}>relevant</span></EuiTextColor> to this incident.
                          </EuiText>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup gutterSize="none" direction="row">
                <EuiFlexItem grow={false} style={{ minWidth: 60, paddingLeft: 15 }}>
                  <EuiCheckbox
                    id="legendcheckboxUnchecked"
                    checked={false}
                    onChange={() => { }}
                  />
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiText size="s" color="subdued">
                    the event is <EuiTextColor color="default"><span style={{ fontWeight: "bold" }}>irrelevant</span></EuiTextColor> to this incident.
                          </EuiText>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGroup direction="column">
          <EuiFlexItem>
            <EuiFlexGroup direction="rowReverse">
              <EuiFlexItem grow={false} style={{ paddingRight: 30 }}>
                <EuiButton fill onClick={this.onSubmit} isLoading={this.submitButtonIsLoading}>
                  Submit
                        </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}