const mockParams = `metadata:
  name: pvc-016a5372-881d-4f6e-a03f-5d62ecfc8fdf
  spec:
  capacity:
    storage: 20Gi
  csi:
    driver: disk.csi.qingcloud.com
    volumeHandle: vol-qdc2yaf9
    fsType: ext4
    volumeAttributes:
      fsType: ext4
  accessModes:
    - ReadWriteOnce
  claimRef:
    kind: PersistentVolumeClaim
    namespace: test2
    name: mysql-t9o98a
    uid: 016a5372-881d-4f6e-a03f-5d62ecfc8fdf
    apiVersion: v1
    resourceVersion: '557441466'
  persistentVolumeReclaimPolicy: Delete
  storageClassName: qingcloud-csi
  volumeMode: Filesystem
  nodeAffinity:
    required:
      nodeSelectorTerms:
        - matchExpressions:
          - key: topology.disk.csi.qingcloud.com/zone
            operator: In
            values:
              - ap2a
          - key: topology.disk.csi.qingcloud.com/instance-type
            operator: In
            values:
              - HighPerformance
        - matchExpressions:
          - key: topology.disk.csi.qingcloud.com/instance-type
            operator: In
            values:
              - Standard
          - key: topology.disk.csi.qingcloud.com/zone
            operator: In
            values:
              - ap2a
`;

export default mockParams;
